import {PricingServiceName} from '../domain/pricingServiceName';
import {Pricing} from '../domain/pricing';

export interface IPricingRepo {
  exists (pricingServiceName: PricingServiceName): Promise<boolean>;
  getPricing (): Promise<any>;
  save (user: Pricing): Promise<void>;
  delete(prisingIds: string[]): Promise<void>;
}
