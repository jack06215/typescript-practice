type Route = {
    origin: {
        city: string;
        state: string;
        departureFee: number;
    };
    destination: {
        city: string;
        state: string;
        arriveFee: number;
    };
};

type Origin = Route['origin'];
type Destination = Route['destination'];

const trip_origin: Origin = {
    city: "Denver",
    state: "Colorado",
    departureFee: 13,
};

const trip_dst: Destination = {
    city: "Phoenix",
    state: "Arizona",
    arriveFee: 8.5,
};