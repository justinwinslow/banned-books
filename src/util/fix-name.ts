// Turn "Name, Your" into "Your Name"
export default function fixName(name: string) {
  if (name.indexOf(', ') > -1) {
    let nameSegments = name.split(', ');
    return `${nameSegments[1]} ${nameSegments[0]}`;
  }

  return name;
}
