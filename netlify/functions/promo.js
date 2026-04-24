export async function handler(event, context) {
  const promoCodes = [
    { code: "EARLY20", type: "percent", value: 20 },
    { code: "DEFIANCE10", type: "percent", value: 10 },
    { code: "TESTING", type: "flat", value: 37.47 }
  ];

  const body = JSON.parse(event.body);
  const code = body.code.toUpperCase();

  const match = promoCodes.find(p => p.code === code);

  return {
    statusCode: 200,
    body: JSON.stringify({
      valid: !!match,
      promo: match || null
    })
  };
}