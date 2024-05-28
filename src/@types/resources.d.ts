interface Resources {
  "authPage": {
    "loginTab": {
      "label": "Увійти",
      "usernameInput": {
        "label": "Користувацьке ім'я",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minLengthHelperText": "Поле повинно містити принаймні {{value}} символів",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "passwordInput": {
        "label": "Пароль",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minLengthHelperText": "Поле повинно містити принаймні {{value}} символів",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "loginButtonText": "Увійти",
      "successMessage": "Ви успішно увійшли в систему"
    },
    "registerTab": {
      "label": "Зареєструватись",
      "companyNameInput": {
        "label": "Назва компанії",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "firstNameInput": {
        "label": "Ім'я",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "lastNameInput": {
        "label": "Прізвище",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "usernameInput": {
        "label": "Користувацьке ім'я",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minLengthHelperText": "Поле повинно містити принаймні {{value}} символів",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "passwordInput": {
        "label": "Пароль",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minLengthHelperText": "Поле повинно містити принаймні {{value}} символів",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "registerButtonText": "Зареєструватись",
      "successMessage": "Реєстрація пройшла успішно"
    }
  },
  "cinemasPage": {
    "createFirstCinemaText": "У вас немає жодного кінотеатру. Створіть перший",
    "createButtonText": "Створити",
    "modal": {
      "title": "Створити кінотеатр",
      "nameInput": {
        "label": "Назва",
        "requiredhelperTextMessage": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "addressInput": {
        "label": "Адреса",
        "requiredhelperTextMessage": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "createButtonText": "Створити"
    },
    "table": {
      "nameColumnLabel": "Назва",
      "addressColumnLabel": "Адреса",
      "deleteCinemaConfirmation": {
        "part1": "Ви дійсно хочете видалити",
        "part2": "кінотеатр \"{{cinemaName}}\"?"
      }
    }
  },
  "confirmationModal": {
    "confirm": "Підтвердити",
    "cancel": "Скасувати"
  },
  "filmsPage": {
    "createFirstFilmText": "У вас немає жодного фільму. Створіть перший",
    "table": {
      "nameColumnLabel": "Назва",
      "durationColumnLabel": "Тривалість",
      "deleteFilmConfirmation": {
        "part1": "Ви дійсно хочете видалити",
        "part2": "фільм \"{{filmName}}\"?"
      }
    },
    "createButtonText": "Створити",
    "model": {
      "titleText": "Створити фільм",
      "nameInput": {
        "label": "Назва",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "durationInput": {
        "label": "Тривалість hh:mm:ss"
      },
      "createButtonText": "Створити"
    }
  },
  "hallPage": {
    "changesSuccessfulySavedMessage": "Зміни успішно збережені"
  },
  "hallsPage": {
    "createFirstHallText": "У вас немає жодного залу. Створіть перший",
    "table": {
      "nameColumnLabel": "Назва",
      "numberOfSeatsLabel": "Кількість місць",
      "deleteHallConfirmation": {
        "part1": "Ви дійсно хочете видалити",
        "part2": "кінозал \"{{hallName}}\"?"
      }
    },
    "createButtonText": "Створити",
    "model": {
      "titleText": "Створити зал",
      "nameInput": {
        "label": "Назва",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "numberOfRowsInput": {
        "label": "Кількість рядів",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minValueHelperText": "Поле повинно бути більше або дорівнювати {{value}}",
        "maxValueHelperText": "Поле повинно бути менше або дорівнювати {{value}}"
      },
      "numberOfColumnsInput": {
        "label": "Кількість колонок",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minValueHelperText": "Поле повинно бути більше або дорівнювати {{value}}",
        "maxValueHelperText": "Поле повинно бути менше або дорівнювати {{value}}"
      },
      "createButtonText": "Створити"
    }
  },
  "header": {
    "menuItems": {
      "general": {
        "home": "Головна"
      },
      "owner": {
        "cinemas": "Кінотеатри",
        "employees": "Співробітники"
      },
      "worker": {
        "products": "Товари",
        "films": "Фільми",
        "sessions": "Сеанси"
      },
      "reviewer": {
        "reports": "Звіти"
      }
    },
    "startWorkday": {
      "buttonText": "Почати",
      "modal": {
        "cinemaInput": {
          "label": "Кінотеатр",
          "requiredHelperText": "Поле обов'язкове до заповнення",
          "emptyListText": "Спочатку створіть кінотеатр",
          "item": "\"{{cinemaName}}\" на \"{{cinemaAddress}}\""
        },
        "buttonText": "Почати"
      }
    },
    "finishWorkday": {
      "buttonText": "Завершити",
      "confirmationText": "Ви дійсно бажаєте завершити поточний робочий день?"
    },
    "logoutButtonText": "Вийти"
  },
  "homePage": {
    "welcomeText": "{{fullName}}, ласкаво просимо до Cimas!"
  },
  "productsPage": {
    "createFirstProductText": "У вас немає жодного товару. Створіть перший.",
    "saveChangesButtonText": "Зберегти зміни",
    "changesSuccessfulySavedMessage": "Зміни успішно збережені",
    "createButtonText": "Створити",
    "model": {
      "titleText": "Створити товар",
      "nameInput": {
        "label": "Назва",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "priceInput": {
        "label": "Ціна",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minValueHelperText": "Поле повинно бути більше або дорівнювати {{value}}"
      },
      "createButtonText": "Створити"
    },
    "table": {
      "nameColumnLabel": "Назва",
      "priceColumnLabel": "Ціна",
      "amountColumnLabel": "Кількість",
      "soldAmountColumnLabel": "Продано",
      "incomeAmountColumnLabel": "Надійшло",
      "deleteFilmConfirmation": {
        "part1": "Ви дійсно бажаєте видалити",
        "part2": "товар \"{{productName}}\"?"
      }
    }
  },
  "reportPage": {
    "statusSelect": {
      "text": "Статус",
      "types": {
        "notReviewed": "Не переглянуто",
        "approved": "Схвалено",
        "rejected": "Відхилено"
      },
      "changesSuccessfulySavedMessage": "Зміни успішно збережені"
    },
    "downloadButtonText": "Завантажити"
  },
  "reportsPage": {
    "createFirstReportText": "У вас немає жодного звіту",
    "table": {
      "startWorkdayColumnLabel": "Початок робочого дня",
      "endWorkdayLabel": "Кінець робочого дня",
      "statusWorkdayLabel": {
        "text": "Статус",
        "types": {
          "notReviewed": "Не переглянуто",
          "approved": "Схвалено",
          "rejected": "Відхилено"
        }
      }
    }
  },
  "seatsEditor": {
    "saveChangesButtonText": "Зберегти зміни",
    "alphabets": "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ"
  },
  "sessionPage": {
    "changesSuccessfulySavedMessage": "Зміни успішно збережені"
  },
  "sessionsPage": {
    "controlPanel": {
      "todayButtonText": "Сьогодні",
      "createButton": {
        "text": "Створити",
        "model": {
          "titleText": "Створити сесію",
          "hallInput": {
            "label": "Зал",
            "requiredHelperText": "Поле обов'язкове до заповнення",
            "emptyListText": "Спочатку створіть зал"
          },
          "filmInput": {
            "label": "Фільм",
            "requiredHelperText": "Поле обов'язкове до заповнення",
            "emptyListText": "Спочатку створіть фільм"
          },
          "startDateTinmeInput": {
            "label": "Дата та час початку"
          },
          "priceInput": {
            "label": "Ціна за квиток",
            "requiredHelperText": "Поле обов'язкове до заповнення",
            "minValueHelperText": "Поле повинно бути більше або дорівнювати {{value}}"
          },
          "createButtonText": "Створити"
        }
      }
    },
    "calendar": {
      "eventContent": {
        "name": "\"{{filmName}}\" в \"{{hallName}}\""
      },
      "menuItems": {
        "details": "Детальніше",
        "delete": {
          "text": "Видалити",
          "deleteFilmConfirmation": {
            "part1": "Ви дійсно хочете видалити сеанс, що проходить",
            "part2": "з {{startTimeText}} до {{endTimeText}} в кінозалі\"{{hallName}}\"?"
          }
        }
      }
    }
  },
  "usersPage": {
    "registerFirstEmployeeText": "У вас немає жодного працівника. Зареєструйте першого",
    "table": {
      "fullNameColumnLabel": "Повне ім'я",
      "roleColumnLabel": "Посада",
      "fireEmployeeConfirmation": {
        "part1": "Ви дійсно хочете звільнити",
        "part2": "працівника \"{{fullName}}\"?"
      }
    },
    "registerButtonText": "Зареєструвати",
    "model": {
      "titleText": "Зареєструвати працівника",
      "roleInput": {
        "label": "Посада",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "menuItems": {
          "Worker": "Працівник",
          "Reviewer": "Перевіряючий"
        }
      },
      "firstNameInput": {
        "label": "Ім'я",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "lastNameInput": {
        "label": "Прізвище",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "usernameInput": {
        "label": "Користувацьке ім'я",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minLengthHelperText": "Поле повинно містити принаймні {{value}} символів",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "passwordInput": {
        "label": "Пароль",
        "requiredHelperText": "Поле обов'язкове до заповнення",
        "minLengthHelperText": "Поле повинно містити принаймні {{value}} символів",
        "maxLengthHelperText": "Поле повинно містити максимум {{value}} символів"
      },
      "registerButtonText": "Зареєструвати",
      "successMessage": "Реєстрація пройшла успішно"
    }
  }
}

export default Resources;
