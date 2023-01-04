import { LaunchMap } from "../LaunchMap";

const getLaunchName = (data: any) => {
  for (let i = 0; i < LaunchMap.length; i++) {
    if (LaunchMap[i].id == Number(data.id)) return LaunchMap[i].name;
  }
}

const getLaunchID = (pathname: string[]) => {
  for (let i = 0; i < LaunchMap.length; i++) {
    if (LaunchMap[i].name.match(pathname[2])) return String(LaunchMap[i].id);
  }
}

export { getLaunchName, getLaunchID }