import { Api } from './Api';
import { Id, Json, JsonValue, List, Uri } from '../types';
import { Map } from '../utils';
import { RouteGateway } from './RouteGateway';

export class MappedRouteGateway extends RouteGateway {
  constructor(readonly route: Uri, readonly routeId: Uri, readonly map = new Map(), readonly api: Api = new Api()) {
    super(route, routeId, api);
  }

  all(): Promise<List<Json>> {
    return super.all().then(is => is.map(i => this.map.in(i)));
  }

  byId(id: Id): Promise<Json | undefined> {
    return super.byId(id).then(i => this.map.in(i));
  }

  search(q: JsonValue): Promise<List<Json>> {
    return super.search(q).then(is => is.map(i => this.map.in(i)));
  }

  add(item: Json): Promise<Json> {
    return super.add(this.map.out(item));
  }

  update(item: Json): Promise<Json> {
    return super.update(this.map.out(item));
  }
}
