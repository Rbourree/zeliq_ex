-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_id_car_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_id_user_fkey";

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_id_car_fkey" FOREIGN KEY ("id_car") REFERENCES "Cars"("id_car") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
