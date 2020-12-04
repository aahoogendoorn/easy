import { Dev, DevGateway, DevRepo } from '../ref';
import { mock } from '@thisisagile/easy-test';

describe('Repo', () => {

  const devs = [Dev.Sander.toJSON(), Dev.Jeroen.toJSON(), Dev.Naoufal.toJSON()];
  let gateway: DevGateway;
  let repo: DevRepo;

  beforeEach(() => {
    gateway = new DevGateway();
    repo = new DevRepo(gateway);
  });

  test('all triggers gateway', async () => {
    gateway.all = mock.resolve(devs);
    const ds = await repo.all();
    expect(gateway.all).toHaveBeenCalled();
    expect(ds[0]).toBeInstanceOf(Dev);
  });

  test('byId triggers gateway', async () => {
    gateway.byId = mock.resolve(devs[0]);
    const d = await repo.byId(42);
    expect(gateway.byId).toHaveBeenCalledWith(42);
    expect(d).toBeInstanceOf(Dev);
    expect(d).toMatchObject(devs[0]);
  });
});