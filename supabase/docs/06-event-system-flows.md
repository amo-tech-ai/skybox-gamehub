# 🎯 **SKYBOX GAMEHUB - EVENT SYSTEM FLOW DIAGRAMS**
## **User Journey & Process Flow Documentation**

---

## **📊 USER JOURNEY FLOWS**

### **1. Event Discovery & Browsing Flow**
```mermaid
flowchart TD
    A[User visits Skybox] --> B{Authenticated?}
    B -->|No| C[Browse Public Events]
    B -->|Yes| D[Browse All Events + Personal]
    
    C --> E[Filter by Category]
    D --> E
    E --> F[Search Events]
    F --> G[View Event Details]
    G --> H{Interested?}
    H -->|No| I[Continue Browsing]
    H -->|Yes| J[Check Availability]
    
    J --> K{Spots Available?}
    K -->|No| L[Join Waitlist]
    K -->|Yes| M[Select Package]
    
    M --> N[Choose Seating]
    N --> O[Add to Cart]
    O --> P[Proceed to Checkout]
    
    I --> E
    L --> Q[Get Notified When Available]
    P --> R[Payment Process]
```

### **2. Event Booking & Payment Flow**
```mermaid
flowchart TD
    A[Select Event Package] --> B[Choose Seating/Table]
    B --> C[Add Guest Information]
    C --> D[Apply Promo Code]
    D --> E[Review Booking Details]
    E --> F[Proceed to Payment]
    
    F --> G{Payment Method}
    G -->|Credit Card| H[Stripe Payment]
    G -->|Shopify Checkout| I[Shopify Payment]
    
    H --> J{Payment Success?}
    I --> J
    J -->|No| K[Payment Failed]
    J -->|Yes| L[Create Booking Record]
    
    K --> M[Retry Payment]
    M --> J
    
    L --> N[Send Confirmation Email]
    N --> O[Send WhatsApp Confirmation]
    O --> P[Update Event Availability]
    P --> Q[Booking Complete]
```

### **3. Event Management (Staff) Flow**
```mermaid
flowchart TD
    A[Staff Login] --> B[Access Admin Dashboard]
    B --> C{Action Type}
    
    C -->|Create Event| D[Event Creation Form]
    C -->|Manage Bookings| E[Booking Management]
    C -->|Update Event| F[Event Edit Form]
    C -->|View Analytics| G[Event Analytics]
    
    D --> H[Fill Event Details]
    H --> I[Upload Media]
    I --> J[Set Pricing & Packages]
    J --> K[Configure Availability]
    K --> L[Publish Event]
    
    E --> M[View All Bookings]
    M --> N{Booking Action}
    N -->|Confirm| O[Confirm Booking]
    N -->|Cancel| P[Cancel Booking]
    N -->|Refund| Q[Process Refund]
    
    F --> R[Edit Event Details]
    R --> S[Update Media]
    S --> T[Save Changes]
    
    L --> U[Event Live]
    O --> V[Send Confirmation]
    P --> W[Send Cancellation]
    Q --> X[Process Refund]
    T --> Y[Event Updated]
```

---

## **🔧 SYSTEM PROCESS FLOWS**

### **4. Database Schema Creation Flow**
```mermaid
flowchart TD
    A[Start Schema Development] --> B[Create Schema Files]
    B --> C[Define Table Structure]
    C --> D[Add Relationships & Constraints]
    D --> E[Create Indexes]
    E --> F[Define RLS Policies]
    F --> G[Add Helper Functions]
    G --> H[Create Triggers]
    H --> I[Test Schema Locally]
    I --> J{Schema Valid?}
    J -->|No| K[Fix Issues]
    K --> I
    J -->|Yes| L[Generate Migration]
    L --> M[Review Migration]
    M --> N[Apply to Development]
    N --> O[Test in Development]
    O --> P[Deploy to Production]
```

### **5. Shopify Integration Flow**
```mermaid
flowchart TD
    A[Shopify Order Created] --> B[Webhook Sent to Supabase]
    B --> C[HMAC Validation]
    C --> D{Valid Signature?}
    D -->|No| E[Reject Webhook]
    D -->|Yes| F[Check Idempotency]
    F --> G{Already Processed?}
    G -->|Yes| H[Skip Processing]
    G -->|No| I[Process Order Data]
    
    I --> J[Create Booking Record]
    J --> K[Update Event Availability]
    K --> L[Send Confirmation Email]
    L --> M[Send WhatsApp Notification]
    M --> N[Update Payment Status]
    N --> O[Log Webhook Event]
    O --> P[Integration Complete]
    
    E --> Q[Log Security Violation]
    H --> R[Return Success]
```

### **6. WhatsApp Notification Flow**
```mermaid
flowchart TD
    A[Trigger Event] --> B{Notification Type}
    B -->|Booking Confirmation| C[Get Booking Details]
    B -->|Event Reminder| D[Get Event Details]
    B -->|Payment Receipt| E[Get Payment Details]
    B -->|Cancellation| F[Get Cancellation Details]
    
    C --> G[Load Template]
    D --> G
    E --> G
    F --> G
    
    G --> H[Personalize Message]
    H --> I[Validate Phone Number]
    I --> J{Valid Number?}
    J -->|No| K[Log Invalid Number]
    J -->|Yes| L[Send WhatsApp Message]
    
    L --> M{Delivery Success?}
    M -->|Yes| N[Update Delivery Status]
    M -->|No| O[Retry Logic]
    O --> P{Max Retries?}
    P -->|No| L
    P -->|Yes| Q[Mark as Failed]
    
    N --> R[Notification Complete]
    K --> S[Skip Notification]
    Q --> T[Log Failure]
```

---

## **🔄 DATA FLOW DIAGRAMS**

### **7. Event Data Flow**
```mermaid
flowchart LR
    A[Event Creation] --> B[Database Storage]
    B --> C[RLS Policy Check]
    C --> D[Data Validation]
    D --> E[Index Update]
    E --> F[Cache Update]
    F --> G[Frontend Display]
    G --> H[User Interaction]
    H --> I[Booking Request]
    I --> J[Availability Check]
    J --> K[Booking Creation]
    K --> L[Payment Processing]
    L --> M[Confirmation Flow]
```

### **8. Payment Processing Flow**
```mermaid
flowchart TD
    A[Payment Initiated] --> B{Payment Provider}
    B -->|Stripe| C[Stripe API Call]
    B -->|Shopify| D[Shopify Checkout]
    
    C --> E{Payment Success?}
    D --> F[Shopify Webhook]
    F --> G[Process Webhook]
    G --> E
    
    E -->|Yes| H[Update Payment Status]
    E -->|No| I[Payment Failed]
    
    H --> J[Create Booking]
    J --> K[Send Confirmation]
    K --> L[Update Inventory]
    L --> M[Payment Complete]
    
    I --> N[Retry Payment]
    N --> O{Max Retries?}
    O -->|No| B
    O -->|Yes| P[Payment Abandoned]
```

---

## **📱 MOBILE & RESPONSIVE FLOWS**

### **9. Mobile Event Discovery**
```mermaid
flowchart TD
    A[Mobile User] --> B[Load Mobile Homepage]
    B --> C[View Featured Events]
    C --> D[Swipe Through Events]
    D --> E[Tap Event Card]
    E --> F[View Event Details]
    F --> G[Check Mobile Availability]
    G --> H{Spots Available?}
    H -->|Yes| I[Quick Book Button]
    H -->|No| J[Join Waitlist]
    
    I --> K[Mobile Checkout]
    K --> L[Payment on Mobile]
    L --> M[Confirmation Screen]
    M --> N[WhatsApp Confirmation]
    
    J --> O[Waitlist Notification]
```

### **10. Admin Mobile Management**
```mermaid
flowchart TD
    A[Admin Mobile Login] --> B[Admin Dashboard]
    B --> C[View Event Stats]
    C --> D[Quick Actions]
    D --> E{Action Type}
    E -->|Check Bookings| F[View Booking List]
    E -->|Update Event| G[Edit Event Details]
    E -->|Send Notification| H[Broadcast Message]
    
    F --> I[Booking Details]
    I --> J[Quick Status Update]
    
    G --> K[Update Event Info]
    K --> L[Save Changes]
    
    H --> M[Select Recipients]
    M --> N[Compose Message]
    N --> O[Send via WhatsApp]
```

---

## **🔐 SECURITY & AUTHENTICATION FLOWS**

### **11. User Authentication Flow**
```mermaid
flowchart TD
    A[User Access] --> B{Authentication Required?}
    B -->|No| C[Public Access]
    B -->|Yes| D[Check Auth Token]
    D --> E{Valid Token?}
    E -->|Yes| F[Load User Profile]
    E -->|No| G[Redirect to Login]
    
    G --> H[Login Form]
    H --> I[Submit Credentials]
    I --> J[Supabase Auth]
    J --> K{Auth Success?}
    K -->|Yes| L[Generate JWT]
    K -->|No| M[Show Error]
    
    L --> N[Store Session]
    N --> O[Load User Data]
    O --> P[Access Granted]
    
    M --> H
    F --> Q[Check Permissions]
    Q --> R[Access Granted]
```

### **12. RLS Policy Enforcement Flow**
```mermaid
flowchart TD
    A[Database Query] --> B[Check User Role]
    B --> C{Role Type}
    C -->|Anonymous| D[Public Data Only]
    C -->|Authenticated| E[User + Public Data]
    C -->|Staff| F[All Data Access]
    C -->|Admin| G[Full System Access]
    
    D --> H[Apply Public Policies]
    E --> I[Apply User Policies]
    F --> J[Apply Staff Policies]
    G --> K[Apply Admin Policies]
    
    H --> L[Execute Query]
    I --> L
    J --> L
    K --> L
    
    L --> M[Return Results]
    M --> N[Log Access]
```

---

## **📊 ANALYTICS & MONITORING FLOWS**

### **13. Event Analytics Flow**
```mermaid
flowchart TD
    A[Event Created] --> B[Start Analytics Tracking]
    B --> C[Track Views]
    C --> D[Track Interactions]
    D --> E[Track Bookings]
    E --> F[Track Payments]
    F --> G[Track Completions]
    
    G --> H[Calculate Metrics]
    H --> I[Update Dashboard]
    I --> J[Generate Reports]
    J --> K[Send Alerts]
    K --> L[Store Historical Data]
```

### **14. System Health Monitoring**
```mermaid
flowchart TD
    A[System Monitoring] --> B[Check Database Health]
    B --> C[Check API Response Times]
    C --> D[Check Error Rates]
    D --> E[Check User Activity]
    E --> F[Check Payment Success]
    F --> G[Check Notification Delivery]
    
    G --> H[Calculate Health Score]
    H --> I{Health Score}
    I -->|Good| J[Continue Monitoring]
    I -->|Warning| K[Send Alert]
    I -->|Critical| L[Send Emergency Alert]
    
    K --> M[Investigate Issue]
    L --> N[Emergency Response]
    M --> O[Fix Issue]
    N --> P[System Recovery]
```

---

## **🎯 KEY INTEGRATION POINTS**

### **15. External Service Integration**
```mermaid
flowchart LR
    A[Skybox System] --> B[Supabase Database]
    A --> C[Stripe Payments]
    A --> D[Shopify E-commerce]
    A --> E[WhatsApp API]
    A --> F[Email Service]
    
    B --> G[Real-time Updates]
    C --> H[Payment Processing]
    D --> I[Order Management]
    E --> J[Messaging]
    F --> K[Email Notifications]
    
    G --> L[Frontend Updates]
    H --> M[Booking Confirmation]
    I --> N[Inventory Sync]
    J --> O[User Engagement]
    K --> P[Communication]
```

---

## **📋 FLOW SUMMARY**

### **User-Facing Flows**
1. **Event Discovery** - Browse, search, filter events
2. **Booking Process** - Select, pay, confirm bookings
3. **Mobile Experience** - Optimized mobile flows
4. **Authentication** - Secure user access

### **System Flows**
5. **Database Operations** - Schema creation and management
6. **Payment Processing** - Multi-provider payment handling
7. **Notification System** - WhatsApp and email automation
8. **Admin Management** - Staff event and booking management

### **Integration Flows**
9. **Shopify Integration** - E-commerce synchronization
10. **WhatsApp Automation** - User communication
11. **Analytics Tracking** - Performance monitoring
12. **Security Enforcement** - RLS and authentication

---

**Last Updated:** October 24, 2025  
**Version:** 1.0 - Event System Flow Diagrams