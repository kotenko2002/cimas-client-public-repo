import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import authPageUkr from "./locales/uk/authPage.json";
import cinemasPageUkr from "./locales/uk/cinemasPage.json";
import filmsPageUkr from "./locales/uk/filmsPage.json";
import hallPageUkr from "./locales/uk/hallPage.json";
import hallsPageUkr from "./locales/uk/hallsPage.json";
import headerUkr from "./locales/uk/header.json";
import homePageUkr from "./locales/uk/homePage.json";
import productsPageUkr from "./locales/uk/productsPage.json";
import reportPageUkr from "./locales/uk/reportPage.json";
import reportsPageUkr from "./locales/uk/reportsPage.json";
import sessionPageUkr from "./locales/uk/sessionPage.json";
import sessionsPageUkr from "./locales/uk/sessionsPage.json";
import usersPageUkr from "./locales/uk/usersPage.json";
import seatsEditorUkr from "./locales/uk/seatsEditor.json";
import confirmationModalUkr from "./locales/uk/confirmationModal.json";

import authPageEng from "./locales/en/authPage.json";
import cinemasPageEng from "./locales/en/cinemasPage.json";
import filmsPageEng from "./locales/en/filmsPage.json";
import hallPageEng from "./locales/en/hallPage.json";
import hallsPageEng from "./locales/en/hallsPage.json";
import headerEng from "./locales/en/header.json";
import homePageEng from "./locales/en/homePage.json";
import productsPageEng from "./locales/en/productsPage.json";
import reportPageEng from "./locales/en/reportPage.json";
import reportsPageEng from "./locales/en/reportsPage.json";
import sessionPageEng from "./locales/en/sessionPage.json";
import sessionsPageEng from "./locales/en/sessionsPage.json";
import usersPageEng from "./locales/en/usersPage.json";
import seatsEditorEng from "./locales/en/seatsEditor.json";
import confirmationModalEng from "./locales/en/confirmationModal.json";

const resources = {
    uk: {
        authPage: authPageUkr,
        cinemasPage: cinemasPageUkr,
        filmsPage: filmsPageUkr,
        hallPage: hallPageUkr,
        hallsPage: hallsPageUkr,
        header: headerUkr,
        homePage: homePageUkr,
        productsPage: productsPageUkr,
        reportPage: reportPageUkr,
        reportsPage: reportsPageUkr,
        sessionPage: sessionPageUkr,
        sessionsPage: sessionsPageUkr,
        usersPage: usersPageUkr,
        seatsEditor: seatsEditorUkr,
        confirmationModal: confirmationModalUkr
    },
    en: {
        authPage: authPageEng,
        cinemasPage: cinemasPageEng,
        filmsPage: filmsPageEng,
        hallPage: hallPageEng,
        hallsPage: hallsPageEng,
        header: headerEng,
        homePage: homePageEng,
        productsPage: productsPageEng,
        reportPage: reportPageEng,
        reportsPage: reportsPageEng,
        sessionPage: sessionPageEng,
        sessionsPage: sessionsPageEng,
        usersPage: usersPageEng,
        seatsEditor: seatsEditorEng,
        confirmationModal: confirmationModalEng
    }
}

i18next
.use(initReactI18next)
.init({
    resources,
    lng:"uk"
});

export default i18next;
