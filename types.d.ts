type Coordinate = {
  type: string;
  properties: {
    projID: string;
    P_Area: string;
    Area_ha: number;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

type Farm = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  latitude: number;
  longitude: number;
  managementAreasGeoJSON: Coordinate[];
}

interface FarmsGridProps {
  farms: Farm[];
}