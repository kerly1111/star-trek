const powerManagementController = require('../controllers/power-management');

describe('Controllers', () => {
    describe('PowerManagementController', () => {
        describe('calculate', () => {
            it('Caso1', async () => {
                const req = {
                    body: {
                        injectorDamageA: 0,
                        injectorDamageB: 0,
                        injectorDamageC: 0,
                        speedOfLight: 100,
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await powerManagementController.calculate(req, res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{
                        "injectorA": 100,
                        "injectorB": 100,
                        "injectorC": 100,
                        "operatingTime": 'Infinito',
                        "alert": "",
                    }]
                ])
            });
            it('Caso2', async () => {
                const req = {
                    body: {
                        injectorDamageA: 0,
                        injectorDamageB: 0,
                        injectorDamageC: 0,
                        speedOfLight: 90,
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await powerManagementController.calculate(req, res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{
                        "injectorA": 90,
                        "injectorB": 90,
                        "injectorC": 90,
                        "operatingTime": 'Infinito',
                        "alert": "",
                    }]
                ])
            });
            it('Caso3', async () => {
                const req = {
                    body: {
                        injectorDamageA: 0,
                        injectorDamageB: 0,
                        injectorDamageC: 0,
                        speedOfLight: 30,
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await powerManagementController.calculate(req, res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{
                        "injectorA": 30,
                        "injectorB": 30,
                        "injectorC": 30,
                        "operatingTime": 'Infinito',
                        "alert": "",
                    }]
                ])
            });
            it('Caso4', async () => {
                const req = {
                    body: {
                        injectorDamageA: 20,
                        injectorDamageB: 10,
                        injectorDamageC: 0,
                        speedOfLight: 100,
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await powerManagementController.calculate(req, res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{
                        "injectorA": 90,
                        "injectorB": 100,
                        "injectorC": 110,
                        "operatingTime": '90 minutos',
                        "alert": "",
                    }]
                ])
            });
            it('Caso5', async () => {
                const req = {
                    body: {
                        injectorDamageA: 0,
                        injectorDamageB: 0,
                        injectorDamageC: 100,
                        speedOfLight: 80,
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await powerManagementController.calculate(req, res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{
                        "injectorA": 120,
                        "injectorB": 120,
                        "injectorC": 0,
                        "operatingTime": '80 minutos',
                        "alert": "",
                    }]
                ])
            });
            it('Caso6', async () => {
                const req = {
                    body: {
                        injectorDamageA: 0,
                        injectorDamageB: 0,
                        injectorDamageC: 0,
                        speedOfLight: 150,
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await powerManagementController.calculate(req, res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{
                        "injectorA": 150,
                        "injectorB": 150,
                        "injectorC": 150,
                        "operatingTime": '50 minutos',
                        "alert": "",
                    }]
                ])
            });
            it('Caso7', async () => {
                const req = {
                    body: {
                        injectorDamageA: 0,
                        injectorDamageB: 0,
                        injectorDamageC: 30,
                        speedOfLight: 140,
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await powerManagementController.calculate(req, res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{
                        "injectorA": 150,
                        "injectorB": 150,
                        "injectorC": 120,
                        "operatingTime": '50 minutos',
                        "alert": "",
                    }]
                ])
            });
            it('Caso7', async () => {
                const req = {
                    body: {
                        injectorDamageA: 20,
                        injectorDamageB: 50,
                        injectorDamageC: 40,
                        speedOfLight: 170,
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await powerManagementController.calculate(req, res);
                expect(res.status.mock.calls).toEqual([
                    [200]
                ]);
                expect(res.send.mock.calls).toEqual([
                    [{
                        "injectorA": 0,
                        "injectorB": 0,
                        "injectorC": 0,
                        "operatingTime": '0 minutos',
                        "alert": "Unable to comply",
                    }]
                ])
            });
        });
    });
});

