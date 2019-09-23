import { aggregate } from './aggregate';

it('should integrate', () => {
  expect(aggregate({
    "2018-02-06": [
      {
          "estimated_diameter": {
              "kilometers": {
                  "estimated_diameter_min": 0.2285361867,
                  "estimated_diameter_max": 0.5110224488
              }
          },
          "is_potentially_hazardous_asteroid": false,
          "close_approach_data": [
              {
                  "relative_velocity": {
                      "kilometers_per_hour": "75712.891702225",
                  },
                  "miss_distance": {
                      "kilometers": "48671808",
                  },
              }
          ]
      },
      {
          "estimated_diameter": {
              "kilometers": {
                  "estimated_diameter_min": 0.0476381598,
                  "estimated_diameter_max": 0.1065221636
              }
          },
          "is_potentially_hazardous_asteroid": false,
          "close_approach_data": [
              {
                  "relative_velocity": {
                      "kilometers_per_hour": "23621.1805629436",
                  },
                  "miss_distance": {
                      "kilometers": "18790072",
                  },
              }
          ]
      }
    ]
  })).toEqual([
    {
      "closest": 18790072,
      "date": new Date("2018-02-06T00:00:00.000Z"),
      "fastest": 75712.891702225,
      "maxEstimatedDiameterKm": 0.5110224488,
      "potentiallyHazardous": 0
    }
  ]);
});
