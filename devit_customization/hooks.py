from . import __version__ as app_version

app_name = "devit_customization"
app_title = "Devit Customization"
app_publisher = "Hardik"
app_description = "Customization of Item and Role"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "hardik.zinzuvadiya@devitpl.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/devit_customization/css/devit_customization.css"
# app_include_js = "/assets/devit_customization/js/devit_customization.js"

# include js, css files in header of web template
# web_include_css = "/assets/devit_customization/css/devit_customization.css"
# web_include_js = "/assets/devit_customization/js/devit_customization.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "devit_customization/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "devit_customization.utils.jinja_methods",
# 	"filters": "devit_customization.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "devit_customization.install.before_install"
# after_install = "devit_customization.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "devit_customization.uninstall.before_uninstall"
# after_uninstall = "devit_customization.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "devit_customization.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

override_doctype_class = {
	"Item": "devit_customization.stock.custom.Item.ItemInherit"
}

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }
doctype_js = {"Role" : "public/js/role.js",
			  "Item": "public/js/article.js"}

# will be executed after successfully installing this app
after_install = "devit_customization.install.after_install"

doc_events = {
	"Item": {
		"validate": "devit_customization.utils.validate_item",
	}
}

doctype_list_js = {"Item" : "public/js/item_list.js"}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"devit_customization.tasks.all"
# 	],
# 	"daily": [
# 		"devit_customization.tasks.daily"
# 	],
# 	"hourly": [
# 		"devit_customization.tasks.hourly"
# 	],
# 	"weekly": [
# 		"devit_customization.tasks.weekly"
# 	],
# 	"monthly": [
# 		"devit_customization.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "devit_customization.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "devit_customization.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "devit_customization.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"devit_customization.auth.validate"
# ]

