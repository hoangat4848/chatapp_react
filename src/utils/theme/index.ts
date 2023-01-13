export type Theme = {
  text: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  userSidebar: {
    backgroundColor: string;
    color: string;
    selected: string;
  };
  conversationSidebar: {
    backgroundColor: string;
    color: string;
    conversationItem: {
      selected: string;
      hover: {
        backgroundColor: string;
      };
      title: {
        color: string;
        lastMessageColor: string;
      };
    };
    tabItem: {
      backgroundColor: string;
      selected: string;
    };
  };
  messagePanel: {
    backgroundColor: string;
    color: string;
    header: {
      title: string;
    };
    body: {
      content: {
        color: string;
      };
    };
    inputContainer: {
      backgroundColor: string;
      color: string;
    };
  };
  participantSidebar: {
    backgroundColor: string;
    color: string;
  };
  page: {
    backgroundColor: string;
  };
  input: {
    backgroundColor: string;
    color: string;
  };
  settingsSidebar: {
    backgroundColor: string;
    activeBackgroundColor: string;
  };
  contextMenu: {
    backgroundColor: string;
    item: {
      hover: string;
    };
  };
};

export const DarkTheme: Theme = {
  background: {
    primary: "#0b0b0b",
    secondary: "#111",
    tertiary: "#141414",
  },
  text: {
    primary: "#fff",
    secondary: "#5f5f5f",
  },
  userSidebar: {
    backgroundColor: "#0b0b0b",
    color: "#fff",
    selected: "#1e1e1e",
  },
  conversationSidebar: {
    backgroundColor: "#111",
    color: "#fff",
    conversationItem: {
      selected: "#1a1a1a",
      hover: {
        backgroundColor: "#222",
      },
      title: {
        color: "#fff",
        lastMessageColor: "#515151",
      },
    },
    tabItem: {
      backgroundColor: "#212121",
      selected: "#303030",
    },
  },
  messagePanel: {
    backgroundColor: "#141414",
    color: "#fff",
    header: {
      title: "#fff",
    },
    body: {
      content: {
        color: "#fff",
      },
    },
    inputContainer: {
      backgroundColor: "#101010",
      color: "#fff",
    },
  },
  participantSidebar: {
    backgroundColor: "#111",
    color: "#fff",
  },
  page: {
    backgroundColor: "#1a1a1a",
  },
  input: {
    backgroundColor: "#202020",
    color: "#fff",
  },
  settingsSidebar: {
    backgroundColor: "#0b0b0b",
    activeBackgroundColor: "#1e1e1e",
  },
  contextMenu: {
    backgroundColor: "#1a1a1a",
    item: {
      hover: "#1f1f1f",
    },
  },
};

export const LightTheme: Theme = {
  background: {
    primary: "#C1C1C1",
    secondary: "#fff",
    tertiary: "#ededed",
  },
  text: {
    primary: "#000",
    secondary: "#636363",
  },
  userSidebar: {
    backgroundColor: "#fff",
    color: "#15161E",
    selected: "#d8d8d8",
  },
  conversationSidebar: {
    backgroundColor: "#fff",
    color: "#000",
    conversationItem: {
      selected: "#D1D1D1",
      hover: {
        backgroundColor: "#D8D8D8",
      },
      title: {
        color: "#000",
        lastMessageColor: "#636363",
      },
    },
    tabItem: {
      backgroundColor: "#ededed",
      selected: "#d8d8d8",
    },
  },
  messagePanel: {
    backgroundColor: "#ededed",
    color: "#fff",
    header: {
      title: "#000",
    },
    body: {
      content: {
        color: "#000",
      },
    },
    inputContainer: {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
  participantSidebar: {
    backgroundColor: "#fff",
    color: "#000",
  },
  page: {
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#ececec",
    color: "#595959",
  },
  settingsSidebar: {
    backgroundColor: "#fff",
    activeBackgroundColor: "#d8d8d8",
  },
  contextMenu: {
    backgroundColor: "#d8d8d8",
    item: {
      hover: "#ececec",
    },
  },
};
