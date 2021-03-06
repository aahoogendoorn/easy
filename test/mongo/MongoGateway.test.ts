import { mock } from '@thisisagile/easy-test';
import { MongoClient } from 'mongodb';
import { devData } from '../ref';
import { Exception, MongoGateway, MongoProvider } from '../../src';

describe('MongoGateway', () => {
  let provider: MongoProvider;
  let gateway: MongoGateway;

  beforeEach(() => {
    const client: MongoClient = new MongoClient('uri');
    provider = new MongoProvider('developers', Promise.resolve(client));
    gateway = new MongoGateway('developers', provider);
  });

  test('All calls the provider', async () => {
    provider.all = mock.resolve(devData);
    await expect(gateway.all()).resolves.toBe(devData);
    expect(provider.all).toHaveBeenCalled();
  });

  test('byId calls the provider', async () => {
    provider.byId = mock.resolve(devData.naoufal);
    await expect(gateway.byId(42)).resolves.toBe(devData.naoufal);
    expect(provider.byId).toHaveBeenCalledWith(42);
  });

  test('search is not implemented', () => {
    return expect(gateway.search).rejects.toMatchException(Exception.IsNotImplemented);
  });

  test('exists resolves to true on existing item', async () => {
    provider.byId = mock.resolve(devData.naoufal);
    await expect(gateway.exists(42)).resolves.toBeTruthy();
    expect(provider.byId).toHaveBeenCalledWith(42);
  });

  test('exists resolves to false on non existing item', async () => {
    provider.byId = mock.resolve();
    await expect(gateway.exists(42)).resolves.toBeFalsy();
    expect(provider.byId).toHaveBeenCalledWith(42);
  });

  test('add calls the provider', async () => {
    provider.add = mock.resolve(devData.naoufal);
    await expect(gateway.add(devData.wouter)).resolves.toBe(devData.naoufal);
    expect(provider.add).toHaveBeenCalled();
  });

  test('remove calls the provider', async () => {
    provider.remove = mock.resolve(true);
    await gateway.remove(42);
    expect(provider.remove).toHaveBeenCalled();
  });

  test('update calls the provider', async () => {
    provider.update = mock.resolve(devData.jeroen);
    await expect(gateway.update(devData.jeroen)).resolves.toBe(devData.jeroen);
    expect(provider.update).toHaveBeenCalled();
  });
});
