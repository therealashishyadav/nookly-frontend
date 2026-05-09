// src/app/models/pg.model.ts

// ── Sharing Option Model ───────────────────────────────────────────────────
export class SharingOptionModel {
  constructor(
    public sharingType: string = 'ONE_SHARING',
    public pricePerMonth: number = 0,
    public totalBeds: number = 1,
    public amenities: string[] = []
  ) {}
}

// ── Main PG Entity Model ───────────────────────────────────────────────────
export class PgModel {
  constructor(
    // Basic Info
    public pgName: string = '',
    public fullAddress: string = '',
    public city: string = '',
    public locality: string = '',
    public pinCode: string = '',
    public googleMapLink: string = '',
    public nearbyLandmarks: string = '',

    // Media
    public coverImageUrl: string = '',
    public galleryImages: string[] = [],
    public virtualTourLink: string = '',
    public videoLink: string = '',

    // Room Details
    public occupancyType: string = '',
    public roomSizeSqFt: number = 0,
    public furnished: boolean = false,
    public attachedWashroom: boolean = false,
    public balconyAvailable: boolean = false,
    public airConditioned: boolean = false,
    public bedType: string = '',
    public mattressProvided: boolean = false,
    public studyTableAvailable: boolean = false,

    // Food & Kitchen
    public foodProvided: boolean = false,
    public mealTypes: string = '',
    public foodOptions: string = '',
    public cookingAllowed: boolean = false,
    public commonKitchenAccess: boolean = false,
    public fridgeAvailable: boolean = false,
    public microwaveAvailable: boolean = false,

    // Amenities
    public wifiAvailable: boolean = false,
    public powerBackupAvailable: boolean = false,
    public geyserAvailable: boolean = false,
    public washingMachineAvailable: boolean = false,
    public housekeepingFrequency: string = '',
    public cctvSurveillance: boolean = false,
    public securityGuardAvailable: boolean = false,
    public liftAvailable: boolean = false,
    public twoWheelerParking: boolean = false,
    public fourWheelerParking: boolean = false,
    public loungeAvailable: boolean = false,
    public recreationAreaAvailable: boolean = false,
    public gymAvailable: boolean = false,
    public rooftopAccess: boolean = false,

    // Services
    public dailyCleaning: boolean = false,
    public laundryService: boolean = false,
    public maintenanceOnCall: boolean = false,
    public waterPurifierAvailable: boolean = false,
    public dispenserAvailable: boolean = false,

    // Rules & Safety
    public entryExitTimings: string = '',
    public visitorsAllowed: boolean = false,
    public guestsOvernightAllowed: boolean = false,
    public securityDepositAmount: number = 0,
    public idVerificationRequired: boolean = false,
    public fireSafetyAvailable: boolean = false,
    public smokingAllowed: boolean = false,
    public petsAllowed: boolean = false,
    public alcoholAllowed: boolean = false,

    // Rent & Charges
    public monthlyRent: number = 0,
    public depositAmount: number = 0,
    public noticePeriodDays: number = 0,
    public lockInPeriodMonths: number = 0,
    public additionalChargesInfo: string = '',
    public maintenanceChargesInfo: string = '',

    // Contact
    public ownerName: string = '',
    public contactNumber: string = '',
    public whatsappNumber: string = '',
    public email: string = '',
    public visitingHours: string = '',
    public availabilityFor: string = '',

    // Agreement & Policy
    public agreementType: string = '',
    public minimumStayMonths: number = 0,
    public noticePeriodToLeaveDays: number = 0,
    public refundPolicy: string = '',
    public houseRulesDocumentUrl: string = '',

    // Offers
    public specialOffers: string = '',
    public earlyBirdDiscounts: string = '',
    public referralBonuses: string = '',

    // Availability
    public immediatePossession: boolean = false,
    public availableFromDate: string = '',
    public waitingList: boolean = false,
    public totalRooms: number = 0,
    public availableRooms: number = 0,

    // Sharing Options — pricing lives here
    public sharingOptions: SharingOptionModel[] = [new SharingOptionModel()]
  ) {}
}

// ── Response model from Spring Boot ───────────────────────────────────────
export interface SharingOptionResponse {
  id: number;
  sharingType: string;
  label: string;
  persons: number;
  pricePerMonth: number;
  totalBeds: number;
  availableBeds: number;
  amenities: string[];
  isAvailable: boolean;
}

export interface PgListingResponse {
  id: number;
  ownerId: number;
  pgName: string;
  fullAddress: string;
  city: string;
  locality: string;
  occupancyType: string;
  occupancyLabel: string;
  lowestPrice: number;
  isActive: boolean;
  isVerified: boolean;
  isBrandNew: boolean;
  isPartnerVerified: boolean;
  rating: number;
  totalReviews: number;
  ownerName: string;
  contactNumber: string;
  coverImageUrl: string;
  createdAt: string;
  sharingOptions: SharingOptionResponse[];
}