import { createApp } from "vue";
import App from "./App.vue";
import SearchBar from "./components/SearchBar.vue";
import FilterBar from "./components/FilterBar.vue";

// FontAwesomeIcon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// FA import icon
import { faMagnifyingGlass, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
library.add(faMagnifyingGlass, faCircleXmark, faAngleDown, faAngleUp);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("search-bar", SearchBar);
app.component("filter-bar", FilterBar);

app.mount("#app");
