import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * A player in a free one-day Americano: a name only, with no app account.
 * Their ids sit in the same `players` / `playerOne` / `playerTwo` / `player`
 * fields a Single Americano fills with User ids, and the free endpoints
 * populate those fields from this model instead of User.
 */
export interface IAmericanoGuestPlayer extends Document {
  league: ObjectId;
  name: string;
}

const americanoGuestPlayerSchema = new Schema<IAmericanoGuestPlayer>(
  {
    league: {
      type: Schema.Types.ObjectId,
      ref: "AmericanoLeague",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const AmericanoGuestPlayer = mongoose.model<IAmericanoGuestPlayer>(
  "AmericanoGuestPlayer",
  americanoGuestPlayerSchema
);

export default AmericanoGuestPlayer;
