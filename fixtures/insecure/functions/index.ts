import cors from 'cors';
export const handler = (req: any, res: any) => { cors({ origin: '*' })(req, res, () => { if (req.body.isAdmin) res.send('ok'); }); };
