class ProductSerializer < ActiveModel::Serializer
  attributes :id, :jewelry, :price, :quantity, :customization_id, :order_id, :stripe_key

  has_one :order
  has_one :customization

  def jewelry
    @jewelry = object.jewelry.capitalize
  end

  def price
    @price = object.price * object.quantity
  end

  def stripe_key
    if object.jewelry == "necklace" && object.customization.custom_type == "phrase"
      @stripe_key = "price_1NMeklK92FCM7B9EdlbTp7Cs"
    elsif object.jewelry == "necklace" && object.customization.custom_type == "word"
      @stripe_key = "price_1NMelRK92FCM7B9EWIZECJV3"
    elsif object.jewelry == "necklace" && object.customization.custom_type == "date"
      @stripe_key = "price_1NMelzK92FCM7B9ESclbtm6w"
    elsif object.jewelry == "bracelet" && object.customization.custom_type == "phrase"
      @stripe_key = "price_1NMemOK92FCM7B9Ebm7PmymW"
    elsif object.jewelry == "bracelet" && object.customization.custom_type == "word"
      @stripe_key = "price_1NMemiK92FCM7B9EF5BKE0ge"
    elsif object.jewelry == "bracelet" && object.customization.custom_type == "date"
      @stripe_key = "price_1NMen0K92FCM7B9EKmpf3Gfj"
    elsif object.jewelry == "keychain" && object.customization.custom_type == "phrase"
      @stripe_key = "price_1NMenLK92FCM7B9Evqz9gwyi"
    elsif object.jewelry == "keychain" && object.customization.custom_type == "word"
      @stripe_key = "price_1NMeneK92FCM7B9Eh0250qlD"
    elsif object.jewelry == "keychain" && object.customization.custom_type == "date"
      @stripe_key = "price_1NMenxK92FCM7B9EDMnruaBL"
    end
  end
end