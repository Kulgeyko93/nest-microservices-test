export const reservationStub = () => ({
  userId: '123',
  startDate: new Date('12-23-2023'),
  endDate: new Date('12-25-2023'),
  placeId: '123131',
  invoiceId: '1',
  timestamp: new Date(),
});

export const reservationDbResultStub = () => ({
  _id: '65e9ac92f7834e1cda40892d',
  timestamp: '2024-03-07T12:01:22.073+00:00',
  startDate: '2023-12-19T21:00:00.000+00:00',
  endDate: '2023-12-24T21:00:00.000+00:00',
  userId: 'test',
  placeId: '123131',
  invoiceId: '1',
});
