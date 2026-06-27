const TOTAL_TABLES = 30;
const TABLES = Array.from({ length: TOTAL_TABLES }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  capacity: i < 10 ? 2 : i < 20 ? 4 : i < 28 ? 6 : 8,
  location: i < 15 ? 'indoor' : 'outdoor',
}));

let reservations: any[] = [];

export function getAvailableTables(date: string, time: string, guests: number) {
  const suitableTables = TABLES.filter(table => table.capacity >= guests);
  const bookedTableIds = reservations.filter(r => r.date === date && r.time === time).map(r => r.tableId);
  const available = suitableTables.filter(table => !bookedTableIds.includes(table.id));
  
  return {
    available,
    total: suitableTables.length,
    booked: suitableTables.length - available.length,
    isFull: available.length === 0,
  };
}

export function makeReservation(data: any) {
  const { available, isFull } = getAvailableTables(data.date, data.time, data.guests);
  
  if (isFull) {
    return { success: false, message: 'No tables available for this time slot.' };
  }

  const table = data.location
    ? available.find(t => t.location === data.location) || available[0]
    : available[0];

  const reservation = {
    id: Math.random().toString(36).substr(2, 9),
    tableId: table.id,
    ...data,
  };

  reservations.push(reservation);
  
  return {
    success: true,
    reservation,
    tableNumber: table.number,
  };
}

export function getTimeSlots() {
  return [
    '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00',
  ];
}