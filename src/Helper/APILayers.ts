import { ApiMockResponse } from "../ApiMockData/dummyData";
import { ISection} from "../Interfaces/Bello";

const LocalStorageKeyName = "bello-sections";
export class SectionAPI {
  async fetchSectionList(): Promise<ISection[]> {
    const apiData: ISection[] = ApiMockResponse;
    let SectionList: ISection[] = [];
    //first check local storage if local storage is empty then add api mock data as seed
    if (localStorage.getItem(LocalStorageKeyName)) {
      const localStorageData: ISection[] = JSON.parse(
        localStorage.getItem(LocalStorageKeyName) ?? "",
      );
      SectionList = [...localStorageData];
    } else {
      SectionList = [...apiData];
      updateLocalStorageSections(SectionList);
    }

    return SectionList;

  }
} 

//Business Layer
export async function fetchSectionList(): Promise<ISection[]> {
  const api = new SectionAPI();
  return api.fetchSectionList();
}
export function updateLocalStorageSections(sections: ISection[]) {
  localStorage.setItem(LocalStorageKeyName, JSON.stringify(sections));
}
