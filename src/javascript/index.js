import '../css/style.css';
import '../css/current.css';
import '../css/hourly.css';
import '../css/forecast.css';
import '../css/search.css';
import '../css/svgs.css';
import '../css/toggle.css';

import { formListener, pageLoadListener } from './listeners';
import { elementsVisibility } from './elements';

elementsVisibility();
pageLoadListener();
formListener();
