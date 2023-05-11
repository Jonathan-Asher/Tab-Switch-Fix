
chrome.commands.onCommand.addListener(function (command) {
  if (command === "left") {
    leftTab();
  } else if (command === "right") {
    rightTab();
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if(request.scheme == 'dark') {
    // alert('dark');
    // chrome.browserAction.setIcon({
    //   path: {
    //     '128': 'dark_icon.png'
    //   }
    // });
  }
})

function leftTab() {
  chrome.tabs.query({ currentWindow: true }, (tabsArray) => {
      // If only 1 tab is present, do nothing.
      if (tabsArray.length === 1) return;
    
      // Otherwise switch to the next available tab.
      // Find index of the currently active tab.
      let activeTabIndex = null;
      tabsArray.forEach((tab, index) => {
        if (tab.active === true) {
          activeTabIndex = index;
        }
      });
    
      // Obtain the next tab. If the current active
      // tab is the last tab, the next tab should be
      // the first tab.
      var nextTab;
      if(activeTabIndex === 0) {
        nextTab = tabsArray[tabsArray.length-1];
      }
      else {
        nextTab = tabsArray[(activeTabIndex - 1) % tabsArray.length];
      }
    
      // Switch to the next tab.
      chrome.tabs.update(nextTab.id, { active: true });
  })
}
function rightTab() {
  chrome.tabs.query({ currentWindow: true }, (tabsArray) => {
    // If only 1 tab is present, do nothing.
    if (tabsArray.length === 1) return;
  
    // Otherwise switch to the next available tab.
    // Find index of the currently active tab.
    let activeTabIndex = null;
    tabsArray.forEach((tab, index) => {
      if (tab.active === true) {
        activeTabIndex = index;
      }
    });
  
    // Obtain the next tab. If the current active
    // tab is the last tab, the next tab should be
    // the first tab.
    const nextTab = tabsArray[(activeTabIndex + 1) % tabsArray.length];
  
    // Switch to the next tab.
    chrome.tabs.update(nextTab.id, { active: true });
  })
}