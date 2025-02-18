# frozen_string_literal: true
if Rails.env.development?
  # Primero creamos el usuario admin
  admin_user = User.find_or_create_by!(email: "jose@moodiday.com") do |user|
    user.password = "Str0ngP@ssw0rd123!"
    user.name = "Admin User"
    user.staff = true
  end

  # Luego creamos la organización directamente usando create_organization
  org = Organization.find_by(slug: "moodiday-test-org")
  
  unless org
    org = Organization.create_organization(
      creator: admin_user,
      name: "Moodi Day",
      slug: "moodiday-test-org"
    )
  end

  # Finalmente, aseguramos que el usuario sea miembro de la organización
  unless org.memberships.exists?(user: admin_user)
    org.create_membership!(user: admin_user, role_name: :admin)
  end
end