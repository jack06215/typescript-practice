type Trip =
  | {
      origin: {
        uuid: string;
        city: string;
        state: string;
      };
    }
  | {
      originUuid: string;
    };

type TripWithOriginRef = Extract<Trip, { originUuid: string }>;
type TripWithOriginWhile = Extract<Trip, { origin: { uuid: string } }>;

const trip_origin_ref = {
  originUuid: "123",
};

const trip_rigin_whole = {
  origin: {
    uuid: "123",
    city: "Denver",
    state: "Coloro",
  },
};

const isRef = (trip: Trip): trip is TripWithOriginRef => {
  return "originUuid" in trip;
};

const res = [trip_origin_ref, trip_rigin_whole].filter(isRef);

console.log(res);
