
export const locator_types = {
    CSS: "css",
    XPATH: "xpath"
}
export const locator = {
    locatorSnippet: (locatorPath, type) => {
      return({
          locator: locatorPath,
          type: type
      });
    },

    byCss: (cssPath) => {
        return (locator.locatorSnippet(cssPath, locator_types.CSS));
    },

    byXpath: (xpath) => {
        return (locator.locatorSnippet(xpath, locator_types.XPATH));
    },

    byName: (name) => {
        return(locator.locatorSnippet(`[name="${name}"]`, locator_types.CSS));
    },

    byId: (id) => {
        return (locator.locatorSnippet(`#${id}`, locator_types.XPATH));
    }
}