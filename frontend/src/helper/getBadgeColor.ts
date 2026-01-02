export function getBadgeColor(type: string) {
  switch (type.toLowerCase()) {
    case "office":
      return "purple";
    case "project":
      return "blue";
    case "planning":
      return "blue";
    case "in progress":
      return "yellow";
    case "completed":
      return "green";
  }
}
