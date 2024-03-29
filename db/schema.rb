# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_03_074547) do

  create_table "date_cells", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.date "date_cell", null: false
    t.integer "month_info_id", null: false
  end

  create_table "event_dates", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", null: false
    t.decimal "price", precision: 10, default: "0"
    t.integer "expense_type", null: false
    t.integer "date_cell_id", null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_event_dates_on_deleted_at"
  end

  create_table "event_memos", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "content", null: false
    t.decimal "price", precision: 10, default: "0"
    t.integer "event_date_id"
    t.integer "payer_id", default: 0
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_event_memos_on_deleted_at"
  end

  create_table "histories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "content"
    t.integer "historyable_id"
    t.string "historyable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["historyable_id", "historyable_type"], name: "index_histories_on_historyable_id_and_historyable_type"
  end

  create_table "month_infos", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.date "start_at", null: false
    t.date "end_at", null: false
    t.integer "power_number_start", null: false
    t.integer "power_number_end", default: 0
    t.decimal "total_budget", precision: 10, null: false
  end

end
