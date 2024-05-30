# Countries Project

## Currently working:

- Endpoint is alive and well. Countries are being requested with useEffect and saved to country state with useState.
- Countries are being listed (with .map) with the countryList component
- Search input is setting state, filtering countries and showing a maximum of 10 results.
- Showing List or Card depending on the amount of the results.
- Showing country details.
- I don't like the solution regarding the language list, because I' not using stuff learned in the course.

## Missing:

- Filter/Search functionality.
- Rules/Disambiguations:
  - If there's more than 10 items, Message component should display (This is completely unnecesary it doesn't need a component)
  - If there's between 2 and 10 items, the items should be displayed with the CountryList component
  - If it's only 1 component CountryCard should display
- When there/s a list of countries, a button should show the CountryCard with the full info.
- Add weather report data to the CountryCard

## Notes

- Maybe I should create a separate service using the other endpont (`https://studies.cs.helsinki.fi/restcountries/api/name/finland`), just for the sake of it.
- Same thing with the weather service.

## Checklist:

- [x] 2.18: Data for countries, step 1
- [x] 2.19: Data for countries, step 2: Button for showing details
- [x] 2.20: Weather data
