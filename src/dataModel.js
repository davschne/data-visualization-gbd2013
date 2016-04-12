export default function(data, locations) {

  return {
    getLocationData(id) {
      return locations[id];
    },
    getDatum(location, age_group, sex, year, metric) {
      // retrieve data point and convert to percentage
      return data[location][age_group][sex][year][metric] * 100;
    },
    getMean({
      location: location,
      age_group: age_group,
      sex: sex,
      start_year: start_year,
      end_year: end_year
    }) {
      if (end_year < start_year) throw Error("end year must be greater than start year");

      let overweight = [];
      let obese      = [];

      for (let year = start_year; year <= end_year; year++) {
        overweight.push(this.getDatum(location, age_group, sex, year, "overweight"));
        obese.push(this.getDatum(location, age_group, sex, year, "obese"));
      }

      console.log("overweight:", overweight);
      console.log("obese:", obese)

      function sum(acc, curr) {
        return acc + curr;
      }

      console.log("avg:", overweight.reduce(sum, 0) / overweight.length);

      return {
        overweight : overweight.reduce(sum, 0) / overweight.length,
        obese      : obese.reduce(sum, 0) / obese.length
      };
    }
  };
};
