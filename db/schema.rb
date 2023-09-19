# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_15_180124) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "group_members", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_group_members_on_group_id"
    t.index ["user_id", "group_id"], name: "index_group_members_on_user_id_and_group_id", unique: true
    t.index ["user_id"], name: "index_group_members_on_user_id"
  end

  create_table "group_widgets", force: :cascade do |t|
    t.bigint "group_id"
    t.bigint "widget_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_group_widgets_on_group_id"
    t.index ["widget_id"], name: "index_group_widgets_on_widget_id"
  end

  create_table "groups", force: :cascade do |t|
    t.bigint "admin_id"
    t.string "name"
    t.string "description"
    t.string "access_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_groups_on_admin_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "recipient_id", null: false
    t.text "message"
    t.string "invitation_status"
    t.string "invitation_code"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invitation_code"], name: "index_invitations_on_invitation_code", unique: true
    t.index ["recipient_id"], name: "index_invitations_on_recipient_id"
    t.index ["sender_id"], name: "index_invitations_on_sender_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.bigint "group_id"
    t.bigint "user_id"
    t.bigint "group_member_id"
    t.string "task_description"
    t.string "task_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_tasks_on_group_id"
    t.index ["group_member_id"], name: "index_tasks_on_group_member_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "email_address"
    t.integer "age"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "widget_data", force: :cascade do |t|
    t.bigint "widget_id"
    t.string "data_key"
    t.string "data_value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["widget_id"], name: "index_widget_data_on_widget_id"
  end

  create_table "widgets", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "group_members", "groups"
  add_foreign_key "group_members", "users"
  add_foreign_key "group_widgets", "groups"
  add_foreign_key "group_widgets", "widgets"
  add_foreign_key "groups", "users", column: "admin_id"
  add_foreign_key "invitations", "users", column: "recipient_id"
  add_foreign_key "invitations", "users", column: "sender_id"
  add_foreign_key "tasks", "group_members"
  add_foreign_key "tasks", "groups"
  add_foreign_key "tasks", "users"
end
