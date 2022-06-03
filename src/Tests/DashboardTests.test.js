const appointmentServices = require("../API-Access/AppointmentGateway");

test("Get all appointments -- Success", async () => {
    const appointments = await appointmentServices.getAll();
    expect(appointments).toBeDefined();
    //expect(appointments.length).toBeGreaterThan(0);
  });
  
