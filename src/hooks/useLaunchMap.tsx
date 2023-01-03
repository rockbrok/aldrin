import { LaunchMap } from "../LaunchMap";

const searchIDInArray = (data: any) => {
  for (let i = 0; i < LaunchMap.length; i++) {
    if (LaunchMap[i].id == Number(data.id)) return LaunchMap[i].name;
  }
}

const searchStringInArray = (pathname: string) => {
  for (let i = 0; i < LaunchMap.length; i++) {
    if (LaunchMap[i].name.match(pathname[2])) return String(LaunchMap[i].id);
  }
  return "";
}

export { searchIDInArray, searchStringInArray }