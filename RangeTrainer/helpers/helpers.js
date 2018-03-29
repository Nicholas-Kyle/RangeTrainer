export { getSubgroupFromHand };

function getSubgroupFromHand(from, group) {
  return group.filter(hand => group.indexOf(hand) <= group.indexOf(from));
}
