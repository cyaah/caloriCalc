const API_KEY = "KqBwC25CfgRxoNXgvoA3ej3Qxv205mji8YsVpvgo";
const SEARCH_ENDPOINT = query =>
	`https://api.nal.usda.gov/ndb/search/?format=json&q=${query}&sort=r&offset=0&api_key=${API_KEY}`;
const NUTRIENT_ENDPOINT = ndbno =>
	`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${API_KEY}&nutrients=203&nutrients=204&nutrients=205&ndbno=${ndbno}`;

export { SEARCH_ENDPOINT, NUTRIENT_ENDPOINT };
