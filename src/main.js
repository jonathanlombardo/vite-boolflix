import { createApp } from "vue";
import App from "./App.vue";
import SearchBar from "./components/SearchBar.vue";

// FontAwesomeIcon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// FA import icon
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("search-bar", SearchBar);

app.mount("#app");
