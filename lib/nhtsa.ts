import axios from "axios";

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

export interface NhtsaMake {
  Make_ID: number;
  Make_Name: string;
}

export interface NhtsaModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export const nhtsaApi = {
  /**
   * Fetch all makes (limited to top for performance or filtered)
   */
  getAllMakes: async (): Promise<NhtsaMake[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/getallmakes?format=json`);
      // Many results, usually we want to filter for popular ones or use search
      return response.data.Results || [];
    } catch (error) {
      console.error("NHTSA API Error (getAllMakes):", error);
      return [];
    }
  },

  /**
   * Fetch models for a specific make name (e.g., 'Tesla')
   */
  getModelsForMake: async (makeName: string): Promise<NhtsaModel[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/getmodelsformake/${makeName}?format=json`
      );
      return response.data.Results || [];
    } catch (error) {
      console.error(`NHTSA API Error (getModelsForMake - ${makeName}):`, error);
      return [];
    }
  },

  /**
   * Fetch models for a specific make name and year
   */
  getModelsForMakeYear: async (makeName: string, year: number): Promise<NhtsaModel[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/getmodelsformakeyear/make/${makeName}/modelyear/${year}?format=json`
      );
      return response.data.Results || [];
    } catch (error) {
      console.error(`NHTSA API Error (getModelsForMakeYear - ${makeName}):`, error);
      return [];
    }
  }
};
