var CSACustom = {};

//Main function to be called by any page using CSA library to collect Analytics data
CSACustom.main = function (
  application,
  marketplaceId,
  requestId,
  pageTypeInfo,
  enableAutoSPA = false
) {
  if (
    application &&
    marketplaceId &&
    application != "undefined" &&
    marketplaceId != "undefined"
  ) {
    //CSA code to create CSA instance
    !(function () {
      function n(n, t) {
        var r = i(n);
        return t && (r = r("instance", t)), r;
      }
      var r = [],
        c = 0,
        i = function (t) {
          return function () {
            var n = c++;
            return (
              r.push([t, [].slice.call(arguments, 0), n, { time: Date.now() }]),
              i(n)
            );
          };
        };
      (n._s = r), (this.csa = n);
    })();

    //Config Variables should be first ones to be set before any of the CSA plugins execute
    if (window?.csa) {
      csa("Config", {
        Application: application,
        ObfuscatedMarketplaceId: marketplaceId,
        "Events.SushiEndpoint":
          "https://unagi.wholefoodsmarket.com/1/events/com.amazon.csm.csa.prod",
        "CacheDetection.RequestID": "WFM20AMD3245OH094NY1",
      });

      csa("Events")("setEntity", {
        page: {
          pageType: pageTypeInfo.pageType || "",
          subPageType: pageTypeInfo.subpageType || "",
          pageTypeId: pageTypeInfo.pageTypeId || "",
          requestId: requestId,
        },
        session: {
          id: CSACustom.getCookie("session-id"),
        },
      });
    }

    CSACustom.setEvents();

    //CSA code to include different plugins
    var e = window?.document?.createElement("script");
    e.src =
      "https://m.media-amazon.com/images/G/01/csa/dist/prod/v2/browser.external-analytics/async.min._TTH_.js";
    window?.document?.head?.appendChild(e);

    enableAutoSPA && CSACustom.autoSPAEventListner(enableAutoSPA);
  }
};

CSACustom.autoSPAEventListner = function (customEvent) {
  if (window.addEventListener) {
    //Event listner only used when there is change in # part of the URL
    window.addEventListener("hashchange", CSACustom.onTransitionSPA);
    //Event listner used when user click on back / forward button in the browser
    window.addEventListener("popstate", CSACustom.onTransitionSPA);
    //CustomEvent which we can listen to see if there is change in URL
    window.addEventListener(customEvent, CSACustom.onTransitionSPA);
  }
};

CSACustom.onTransitionSPA = function () {
  if (csa) {
    let pageTypeInfo = CSACustom.getPageTypeInfoFromSlug(true);

    !CSACustom.getPageSlug()?.match(/\/product\//g) &&
      csa("Events")("removeEntity", "product");
    !CSACustom.getPageSlug()?.match(/\/shipped-to-you\//g) &&
      csa("Events")("removeEntity", "product");
    csa("Events")("removeEntity", "search");

    csa("SPA")(
      "newPage",
      {
        pageType: pageTypeInfo.pageType || "",
        subPageType: pageTypeInfo.subpageType || "",
        pageTypeId: pageTypeInfo.pageTypeId || "",
      },
      ["pageType", "subPageType", "pageTypeId"]
    );
  }
};

CSACustom.getCookie = function (key) {
  try {
    var match = window?.document?.cookie?.match(
      new RegExp("(^| )" + key + "=([^;]+)")
    );
    return match && match[2].trim();
  } catch (ignored) {}
};

CSACustom.getPageSlug = function () {
  let path = window?.location?.pathname;
  path = path?.replace(/(\/)\1+/g, "/");
  return path?.endsWith("/") ? path?.substring(0, path?.length - 1) : path;
};

CSACustom.getURLQueryParameters = function () {
  return window?.location?.search;
};

CSACustom.getQueryParamValue = function (queryParam, key) {
  queryParam = queryParam?.startsWith("?")
    ? queryParam?.substring(1)
    : queryParam;
  let params = queryParam?.split("&");
  if (params) {
    for (let param of params) {
      let pair = param?.split("=");
      if (pair[0] == key) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

  return "";
};

CSACustom.getPageTypeInfoQueryParam = function (queryParameter) {
  let queryParamVal = CSACustom.getQueryParamValue(
    CSACustom.getURLQueryParameters(),
    queryParameter
  );
  return queryParamVal
    ? (pageTypeInfo = {
        pageType: CSACustom.getPageSlug(),
        pageTypeId: queryParamVal,
      })
    : (pageTypeInfo = {
        pageType: CSACustom.getPageSlug(),
      });
};

CSACustom.getPageTypeInfoFromSlug = function (isLandingPage) {
  let pageTypeInfo = {};
  let individualHitString = "_landing";
  let slug = CSACustom.getPageSlug();
  let noFolders = slug?.match(/\//g)?.length;
  noFolders = noFolders > 0 ? noFolders : 1;
  if (noFolders == 1) {
    pageTypeInfo.pageType = slug + individualHitString;
  } else if (noFolders == 2) {
    pageTypeInfo.pageType = slug.substring(0, slug.lastIndexOf("/"));
    if (isLandingPage) pageTypeInfo.subpageType = slug.substring(slug.indexOf("/", 1));
    else pageTypeInfo.pageTypeId = slug;
  } else {
    if (isLandingPage) {
      pageTypeInfo.subpageType = slug + individualHitString;
      pageTypeInfo.pageType = slug.substring(0, slug.lastIndexOf("/"));
    } else {
      pageTypeInfo.pageTypeId = slug;
      let editedSlug = slug.substring(0, slug.lastIndexOf("/"));
      pageTypeInfo.subpageType = editedSlug;
      editedSlug = editedSlug.substring(0, editedSlug.lastIndexOf("/"));
      pageTypeInfo.pageType = editedSlug;
    }
  }
  return pageTypeInfo;
};

CSACustom.getPageTypeInfoPIE = function () {
  let pageTypeInfo = {};
  let individualHitString = "_landing";
  let slug = CSACustom.getPageSlug();
  let noFolders = slug?.match(/\//g)?.length;
  noFolders = noFolders > 0 ? noFolders : 1;
  if (slug?.match(/\/search/g)) {
    pageTypeInfo.pageType = "/search";
  } else if (slug?.match(/\/product\//g)) {
    pageTypeInfo.pageType = "/product";
    pageTypeInfo.pageTypeId = slug;
  } else {
    if (noFolders == 1) {
      pageTypeInfo.pageType = slug + individualHitString;
    } else if (noFolders == 2) {
      pageTypeInfo.pageType = slug.substring(0, slug.lastIndexOf("/"));
      pageTypeInfo.subpageType = slug + individualHitString;
    } else {
      pageTypeInfo.pageType = slug.substring(0, slug.indexOf("/", 1));
      pageTypeInfo.subpageType = slug.substring(
        0,
        slug.indexOf("/", slug.indexOf("/", 1) + 1)
      );
      pageTypeInfo.pageTypeId = slug;
    }
  }
  return pageTypeInfo;
};

CSACustom.generateUUID = function () {
  return Math.abs((Math.random() * 0xffffffff) | 0).toString(36);
};

CSACustom.getRequestId = function () {
  var requestId =
    CSACustom.generateUUID() +
    CSACustom.generateUUID() +
    CSACustom.generateUUID() +
    CSACustom.generateUUID();
  return requestId.toUpperCase().slice(0, 20);
};

CSACustom.setEvents = function () {
  let userAgent = navigator?.userAgent;
  let browserClient = CSACustom.getBrowser(
    navigator.appName,
    navigator.appVersion,
    userAgent
  );
  if (window?.csa) {
    csa("Events")("setEntity", {
      device: {
        userAgent: userAgent,
        type: CSACustom.getDeviceType(userAgent),
        osName: CSACustom.getOS(userAgent),
        browserName: browserClient.browser,
        browserVersion: browserClient.version,
      },
    });
  }
  CSACustom.setStoreInfo();
};

CSACustom.setStoreInfo = function () {
  let storeInfo = CSACustom.getCookie("wfm_store_d8");
  storeInfo = storeInfo && JSON.parse(window.atob(storeInfo));
  if (window?.csa && storeInfo?.id) {
    csa("Events")("setEntity", {
      store: {
        storeId: storeInfo.id,
      },
    });
  }
};

CSACustom.getDeviceType = function (userAgent) {
  let isMobile = userAgent && /mobile/i.test(userAgent.toLowerCase());
  let isTablet =
    userAgent &&
    /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle|KFAPWI/i.test(
      userAgent.toLowerCase()
    );
  let isTabletWithMobile =
    userAgent &&
    /ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle|KFAPWI/i.test(
      userAgent.toLowerCase()
    );

  if (isMobile) {
    return isTabletWithMobile ? "tablet" : "smartphone";
  } else {
    return isTablet ? "tablet" : "desktop";
  }
};

CSACustom.getOS = function (userAgent) {
  let OSS = {
    AndroidOS: "Android",
    BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
    PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
    SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
    WindowsMobileOS:
      "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Windows Mobile|Windows Phone [0-9.]+|WCE;",
    WindowsPhoneOS:
      "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
    iOS: "\\biPhone.*Mobile|\\biPod|AppleCoreMedia",
    iPadOS: "CPU OS|\\biPad",
    MacOS: "Mac OS",
    FireOS: "kindle|KFAPWI",
    MeeGoOS: "MeeGo",
    MaemoOS: "Maemo",
    JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
    webOS: "webOS|hpwOS",
    badaOS: "\\bBada\\b",
    BREWOS: "BREW",
  };

  for (let key in OSS) {
    let OssRegex = new RegExp(OSS[key], "i");
    if (OssRegex?.test(userAgent?.toLowerCase())) return key;
  }
  return "WindowsOS";
};

CSACustom.getBrowser = function (appName, appVersion, userAgent) {
  let client = (() => {
    let engine =
        userAgent?.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [],
      build;

    if (/trident/i.test(engine[1])) {
      build = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return { browser: "IE", version: build[1] || "" };
    }

    if (engine[1] === "Chrome") {
      build = userAgent?.match(/\bOPR\/(\d+)/);

      if (build !== null) {
        return { browser: "Opera", version: build[1] };
      }
    }

    engine = engine[2] ? [engine[1], engine[2]] : [appName, appVersion, "-?"];

    if (userAgent && (build = userAgent.match(/version\/(\d+)/i)) !== null) {
      engine.splice(1, 1, build[1]);
    }

    return {
      browser: engine[0] || appName,
      version: engine[1] || appVersion,
    };
  })();
  return client;
};

CSACustom.setAdditionalEntity = function (data) {
  if (window?.csa) {
    csa("Events")("setEntity", data);
  }
};

if (typeof module === "object") {
  module.exports = CSACustom;
}
