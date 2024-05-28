import { useTranslation } from "react-i18next";

const LanguageChanger = () => {
    const { i18n } = useTranslation(['header', "homePage"]);

    const onClickLanguageChange = (e: any) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
    }

    return (
        <div className="align">
            <select className="custom-select" style={{width: 52, padding: 2}} onChange={onClickLanguageChange} value={i18n.language}>
                <option value="uk" >Ukr</option>
                <option value="en" >Eng</option>
            </select>
        </div>
    );
}

export default LanguageChanger;