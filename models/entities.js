class Client {
  constructor(
    username,
    password,
    num_client,
    society,
    contact,
    address,
    zipcode,
    city,
    phone,
    fax,
    max_outstanding
  ) {
    this.username = username;
    this.password = password;
    this.num_client = num_client;
    this.society = society;
    this.contact = contact;
    this.address = address;
    this.zipcode = zipcode;
    this.city = city;
    this.phone = phone;
    this.fax = fax;
    this.max_outstanding = max_outstanding;
  }
}
