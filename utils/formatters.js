exports.formatOrgResponse = (organization) => ({
  _id: organization._id,
  organizationName: organization.organizationName,
  adminFirstName: organization.adminFirstName,
  adminLastName: organization.adminLastName,
  adminEmail: organization.adminEmail,
  plan: organization.plan,
  status: organization.status,
});
