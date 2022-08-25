import utils from "./utils";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ jirasObject: { jiras: [] } }),
  })
);

test('Verify data contains same jiras object', () => {
    utils.loadData((data) => {
        expect(data.jirasObject).toBe({ jiras: [] });
    })
});
