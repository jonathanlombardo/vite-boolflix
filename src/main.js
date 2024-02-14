import { createApp } from "vue";
import App from "./App.vue";

// FontAwesomeIcon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// FA import icon
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
