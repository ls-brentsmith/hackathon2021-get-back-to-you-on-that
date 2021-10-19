exports.handler = async function(event, context) {
  event.Records.forEach(record => {
    const { body } = record;
    const { event } = event;
    console.log(body);
  });
  return {};
}
