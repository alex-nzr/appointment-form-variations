import styles from '../styles/app.scss';
import {App} from "./appointment/app"
import getProjectSettings from "../store/settings";
import buildAppointmentSkeleton from "./utils/app-html-skeleton";
import initAppSelectors from "./utils/app-selectors";

const selectors     = initAppSelectors(styles);
const settings      = getProjectSettings(selectors);
const appSkeleton   = buildAppointmentSkeleton(styles, settings);

window.addEventListener("load", () => {
    const root = document.getElementById("appointment-widget-root");
    if (root)
    {
        root.innerHTML = appSkeleton;
        App.init(settings);
    }
    else
    {
        console.error("Appointment root selector not found")
    }
});