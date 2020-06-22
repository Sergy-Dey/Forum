
import { Pricing } from "../pricing";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class PricingCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public pricing: Pricing;

  constructor (user: Pricing) {
    this.dateTimeOccurred = new Date();
    this.pricing = user;
  }

  getAggregateId (): UniqueEntityID {
    return this.pricing.id;
  }
}
