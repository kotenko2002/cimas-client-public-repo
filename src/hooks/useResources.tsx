import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useResources = <T, >(resourceName: string): T | null => {
    const { i18n } = useTranslation();
    const [resources, setResources] = useState<T | null>(null);

    useEffect(() => {
        setResources(i18n.getResourceBundle(i18n.language, resourceName) as T);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    return resources;
};

export default useResources;