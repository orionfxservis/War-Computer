import { CustomerInquiry } from '../types';

export const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'INQ-1049',
    customerName: 'Muhammad Bilal Khan',
    email: 'bilal.khan.tech@gmail.com',
    phone: '03001234567',
    city: 'Lahore',
    subject: 'Price & condition confirmation for 4x Dell Latitude 7490 laptops',
    message: 'Assalam-o-Alaikum War Computers, I need 4 units of Dell Latitude 7490 Core i5 8th Gen with 16GB RAM and 256GB NVMe SSD for our software team in Gulberg Lahore. Are they grade-A used with original Dell 65W chargers? What is the best final wholesale price with dispatch to Lahore?',
    inquiryType: 'wholesale',
    productName: 'Dell Latitude 7490 Business Ultrabook',
    createdAt: 'Today, 02:40 PM',
    status: 'new',
    priority: 'high',
    internalNotes: 'Wants delivery by Friday to Gulberg III. Offered 5% cash discount on bank transfer.',
    replies: []
  },
  {
    id: 'INQ-1048',
    customerName: 'Engr. Tariq Mehmood',
    email: 'tariq.civil@peshawartech.pk',
    phone: '03129876543',
    city: 'Peshawar',
    subject: 'COD Delivery & Warranty on HP EliteBook 840 G5',
    message: 'Hello, I want to order the HP EliteBook 840 G5 Core i5 8th Gen 16GB/512GB to University Town, Peshawar. Do you provide Cash on Delivery (COD) via Leopards or TCS? Also please confirm if the 30-day testing warranty covers the battery health.',
    inquiryType: 'order',
    productName: 'HP EliteBook 840 G5 Touch Ultrabook',
    createdAt: 'Today, 11:15 AM',
    status: 'new',
    priority: 'normal',
    internalNotes: 'Advised Rs. 1,000 advance shipping token for COD to KPK.',
    replies: []
  },
  {
    id: 'INQ-1045',
    customerName: 'Ayesha Siddiqui (Beaconhouse System)',
    email: 'ayesha.siddiqui@beaconhouse.edu.pk',
    phone: '03335551212',
    city: 'Karachi',
    subject: 'Quotation for 25x HP Rugged Chromebooks for Computer Lab',
    message: 'Respected Sales Team, we require an official stamped GST/NTN quotation for 25 units of HP Fortis 14 G10 Rugged Chromebooks for our Clifton campus. Please include bank payment terms, invoice format, and freight delivery timeline.',
    inquiryType: 'quote',
    productName: 'HP Fortis 14 G10 Rugged Chromebook',
    createdAt: 'Yesterday, 04:20 PM',
    status: 'replied_email',
    priority: 'urgent',
    internalNotes: 'Official quotation PDF sent from info@warcomputer.com. Waiting for school procurement approval.',
    replies: [
      {
        id: 'rep-001',
        channel: 'email',
        sender: 'War Computers Corporate Desk (info@warcomputer.com)',
        message: 'Respected Ms. Ayesha,\n\nThank you for choosing War Computers! We have generated official B2B wholesale quotation #WC-RFQ-98412 for 25 units of HP Fortis 14 G10 Chromebooks at Rs. 28,500/unit (Total: Rs. 712,500) including 3-year depot warranty and free insured delivery to Clifton, Karachi.\n\nPlease find the attached commercial invoice with our FBR NTN & bank wire details.\n\nWarm regards,\nWar Computers B2B Sales Department',
        sentAt: 'Yesterday, 05:10 PM',
        subject: 'Re: Quotation for 25x HP Rugged Chromebooks - War Computers #WC-RFQ-98412',
        deliveryStatus: 'delivered'
      }
    ]
  },
  {
    id: 'INQ-1042',
    customerName: 'Usman Ali (Gaming Lounge Rawalpindi)',
    email: 'usman.gaming.rwp@outlook.com',
    phone: '03451122334',
    city: 'Rawalpindi',
    subject: 'Urgent RTX 4090 War Apex Titan X Availability',
    message: 'Hi War Computers team, is the War Apex Titan X (i9 14900KS + RTX 4090 24GB) ready in stock for same-day inspection or dispatch to Saddar Rawalpindi / Islamabad? Can I visit your shop to inspect before full payment?',
    inquiryType: 'product_availability',
    productName: 'War Apex Titan X Gaming Desktop (RTX 4090)',
    createdAt: 'Sep 19, 2026',
    status: 'replied_whatsapp',
    priority: 'high',
    internalNotes: 'Contacted on WhatsApp. Customer confirmed visit to warehouse.',
    replies: [
      {
        id: 'rep-002',
        channel: 'whatsapp',
        sender: 'Admin WhatsApp Support (+92 333 0257246)',
        message: 'Assalam-o-Alaikum Usman Bhai! Yes, the RTX 4090 Titan X is ready tested on our benchmark bench with 3DMark scores. You are most welcome to visit our War Computers depot hub tomorrow between 11 AM - 8 PM for live stress-test verification. Shared live Google location on WhatsApp.',
        sentAt: 'Sep 19, 06:30 PM',
        deliveryStatus: 'opened'
      }
    ]
  },
  {
    id: 'INQ-1038',
    customerName: 'Hamza Farooq (Farooq Textiles Ltd)',
    email: 'hamza@farooqtextiles.com.pk',
    phone: '03218899001',
    city: 'Faisalabad',
    subject: 'Warranty query & SSD upgrade for Lenovo ThinkPad T480s',
    message: 'We purchased 6 Lenovo ThinkPad T480s laptops from War Computers last month. We would like to upgrade 2 of them from 256GB to 1TB Samsung NVMe SSDs. Can we send them back or will you courier the pre-cloned SSDs?',
    inquiryType: 'support',
    productName: 'Lenovo ThinkPad T480s Ultrabook',
    createdAt: 'Sep 18, 2026',
    status: 'resolved',
    priority: 'normal',
    internalNotes: 'Couriers 2x pre-imaged 1TB Samsung 980 NVMe SSDs via Trax with toolkits. Tracking: TR-992014.',
    replies: [
      {
        id: 'rep-003',
        channel: 'email',
        sender: 'War Computers Tech Support',
        message: 'Dear Hamza,\n\nWe have dispatched two 1TB Samsung NVMe SSDs with pre-loaded Windows 11 Pro Enterprise imaging. No need to ship the laptops back. Tracking number: TR-992014 via Trax Courier.',
        sentAt: 'Sep 18, 03:00 PM',
        subject: 'Re: SSD Upgrade & Support - War Computers Farooq Textiles',
        deliveryStatus: 'delivered'
      }
    ]
  }
];
